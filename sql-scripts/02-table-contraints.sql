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

ALTER TABLE client_motorcycle
    ADD CONSTRAINT fk_clientMoto_client
        FOREIGN KEY (client_id)
            REFERENCES client(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_clientMoto_motorcycle
        FOREIGN KEY (motorcycle_id)
            REFERENCES client_motorcycle(id) ON DELETE CASCADE;