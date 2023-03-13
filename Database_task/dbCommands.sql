CREATE DATABASE films_database
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

 CREATE TABLE genres
    (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        genre_name varchar(255)
        
    );

CREATE TABLE roles
    (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        role_name varchar(255)

    );

CREATE TABLE persons
    (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name varchar(255),
        surname varchar(255)
    );

CREATE TABLE countries
    (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        country_name varchar(255)
    );

CREATE TABLE film_main_roles
    (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        film_id bigint REFERENCES films (id),
        actor_id bigint REFERENCES persons (id)
    );

CREATE TABLE film_voice_actors
    (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        film_id bigint REFERENCES films (id),
        actor_id bigint REFERENCES persons (id),
        voice_actor_id bigint REFERENCES persons (id)
    );

CREATE TABLE films
    (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        film_name varchar(255),
        year integer,
        country_id bigint REFERENCES countries (id),
        genre_id bigint REFERENCES genres (id),
        slogan text,
        director_id bigint REFERENCES persons (id),
        screenwriter_id bigint REFERENCES persons (id),
        producer_id bigint REFERENCES persons (id),
        operator_id bigint REFERENCES persons (id),
        composer_id bigint REFERENCES persons (id),
        artist_id bigint REFERENCES persons (id),
        editor_id bigint REFERENCES persons (id),
        budget bigint,
        marketing bigint,
        usa_box_office bigint,
        world_box_office bigint,
        russia_premiere_date date,
        world_premiere_date date,
        dvd_release_date date,
        age varchar(255),
        mpaa_rating varchar(255),
        duration interval
    );

CREATE TABLE film_views_by_countries
    (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        film_id bigint REFERENCES films (id),
        country_id bigint REFERENCES countries (id),
        views bigint REFERENCES persons (id)
    );

CREATE TABLE film_genres
    (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        film_id bigint REFERENCES films (id),
        genre_id bigint REFERENCES genres (id)        
    );