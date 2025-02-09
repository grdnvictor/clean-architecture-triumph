ALTER TABLE client
    ADD CONSTRAINT fk_client_concession
        FOREIGN KEY (concessionId)
            REFERENCES concession(id) ON DELETE CASCADE;


ALTER TABLE motorcycle_part
    ADD CONSTRAINT fk_motorcycle_part_motorcycle
        FOREIGN KEY (motorcycleId)
            REFERENCES motorcycle(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_motorcycle_part_part
        FOREIGN KEY (partId)
            REFERENCES part(id) ON DELETE CASCADE;
