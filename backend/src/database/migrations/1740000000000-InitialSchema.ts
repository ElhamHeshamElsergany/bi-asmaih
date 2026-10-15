import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1740000000000 implements MigrationInterface {
  name = "InitialSchema1740000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector`);
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);

    await queryRunner.query(`
      CREATE TABLE books (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title text NOT NULL,
        authors text,
        publisher text,
        edition text,
        language text NOT NULL DEFAULT 'ar',
        source_url text,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE book_sections (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        book_id uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
        parent_id uuid REFERENCES book_sections(id) ON DELETE CASCADE,
        level text NOT NULL CHECK (level IN ('chapter', 'section', 'subsection')),
        title text NOT NULL,
        order_index integer NOT NULL,
        page_start integer,
        page_end integer,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE book_chunks (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        book_id uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
        section_id uuid REFERENCES book_sections(id) ON DELETE SET NULL,
        content text NOT NULL,
        normalized_content text NOT NULL,
        page_start integer,
        page_end integer,
        metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
        embedding vector,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE aqeedah_categories (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        slug text NOT NULL UNIQUE,
        title_arabic text NOT NULL,
        description text,
        order_index integer NOT NULL DEFAULT 0,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE aqeedah_topics (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        category_id uuid REFERENCES aqeedah_categories(id) ON DELETE SET NULL,
        slug text NOT NULL UNIQUE,
        title_arabic text NOT NULL,
        original_text text,
        simplified_explanation text,
        book_id uuid REFERENCES books(id) ON DELETE SET NULL,
        page_start integer,
        page_end integer,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE allah_names (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        slug text NOT NULL UNIQUE,
        name_arabic text NOT NULL,
        meaning text,
        explanation text,
        evidence text,
        source_reference text,
        book_page integer,
        book_id uuid REFERENCES books(id) ON DELETE SET NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE allah_attributes (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        slug text NOT NULL UNIQUE,
        name_arabic text NOT NULL,
        explanation text,
        source_reference text,
        book_page integer,
        book_id uuid REFERENCES books(id) ON DELETE SET NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE allah_name_attributes (
        name_id uuid NOT NULL REFERENCES allah_names(id) ON DELETE CASCADE,
        attribute_id uuid NOT NULL REFERENCES allah_attributes(id) ON DELETE CASCADE,
        source_reference text NOT NULL,
        book_page integer,
        PRIMARY KEY (name_id, attribute_id)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE quran_verses (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        surah_number integer NOT NULL,
        verse_number integer NOT NULL,
        arabic_text text NOT NULL,
        source text NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        UNIQUE (surah_number, verse_number, source)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE hadiths (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        arabic_text text NOT NULL,
        collection text,
        reference text,
        grading text,
        source text NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX hadiths_source_reference_uidx
      ON hadiths (source, collection, reference)
      WHERE reference IS NOT NULL AND collection IS NOT NULL
    `);

    await queryRunner.query(`
      CREATE TABLE topic_quran_evidence (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        topic_id uuid NOT NULL REFERENCES aqeedah_topics(id) ON DELETE CASCADE,
        verse_id uuid NOT NULL REFERENCES quran_verses(id) ON DELETE CASCADE,
        note text,
        UNIQUE (topic_id, verse_id)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE topic_hadith_evidence (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        topic_id uuid NOT NULL REFERENCES aqeedah_topics(id) ON DELETE CASCADE,
        hadith_id uuid NOT NULL REFERENCES hadiths(id) ON DELETE CASCADE,
        note text,
        UNIQUE (topic_id, hadith_id)
      )
    `);

    await queryRunner.query(`CREATE INDEX book_sections_book_id_idx ON book_sections (book_id)`);
    await queryRunner.query(`CREATE INDEX book_chunks_book_id_idx ON book_chunks (book_id)`);
    await queryRunner.query(`CREATE INDEX book_chunks_section_id_idx ON book_chunks (section_id)`);
    await queryRunner.query(`CREATE INDEX aqeedah_topics_category_id_idx ON aqeedah_topics (category_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS topic_hadith_evidence`);
    await queryRunner.query(`DROP TABLE IF EXISTS topic_quran_evidence`);
    await queryRunner.query(`DROP TABLE IF EXISTS hadiths`);
    await queryRunner.query(`DROP TABLE IF EXISTS quran_verses`);
    await queryRunner.query(`DROP TABLE IF EXISTS allah_name_attributes`);
    await queryRunner.query(`DROP TABLE IF EXISTS allah_attributes`);
    await queryRunner.query(`DROP TABLE IF EXISTS allah_names`);
    await queryRunner.query(`DROP TABLE IF EXISTS aqeedah_topics`);
    await queryRunner.query(`DROP TABLE IF EXISTS aqeedah_categories`);
    await queryRunner.query(`DROP TABLE IF EXISTS book_chunks`);
    await queryRunner.query(`DROP TABLE IF EXISTS book_sections`);
    await queryRunner.query(`DROP TABLE IF EXISTS books`);
  }
}
