import { Request, Response } from 'express';
import { ConcessionRepository } from "../../../../application/repositories/ConcessionRepository.ts";
import {
    ListConcessionsUsecase,
    CreateConcessionUsecase,
    DeleteConcessionUsecase,
    GetConcessionByIdUsecase,
    UpdateConcessionUsecase
} from "../../../../application/usecases/concession/index.ts";
// import {
//     createConcessionRequestSchema, deleteConcessionRequestSchema,
//     getConcessionByIdRequestSchema,
//     updateConcessionRequestSchema
// } from '../schemas/concession/index.ts';

export class ConcessionController {
    constructor(private readonly repository: ConcessionRepository) {}

    public async listConcessions(req: Request, res: Response): Promise<void> {
        const listConcessionsUsecase = new ListConcessionsUsecase(this.repository);
        const concessions = await listConcessionsUsecase.execute();
        res.status(200).json(concessions);
    }

    public async createConcession(req: Request, res: Response): Promise<void> {
        // const validation = createConcessionRequestSchema.safeParse(req.body);
        //
        // if (!validation.success) {
        //     res.status(400).send();
        //     return;
        // }

        // const { name, phoneNumber, siret, address } = validation.data;
        const { name, phoneNumber, siret, address } = req.body;
        const createConcessionUsecase = new CreateConcessionUsecase(this.repository);
        const result = await createConcessionUsecase.execute(name, phoneNumber, siret, address);

        if (result instanceof Error) {
            res.status(400).send(result.message);
            return;
        }

        res.status(201).send();
    }

    public async getConcessionById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        // const validation = getConcessionByIdRequestSchema.safeParse({ id });
        //
        // if (!validation.success) {
        //     res.status(400).send('Invalid ID format');
        //     return;
        // }

        const getConcessionByIdUsecase = new GetConcessionByIdUsecase(this.repository);
        const concession = await getConcessionByIdUsecase.execute(id);

        if (!concession) {
            res.status(404).send('Concession not found');
            return;
        }

        res.status(200).json(concession);
    }

    public async updateConcession(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        // const validation = updateConcessionRequestSchema.safeParse(req.body);
        //
        // if (!validation.success) {
        //     res.status(400).send('Malformed request');
        //     return;
        // }

        const { name, phoneNumber, siret, address } = validation.data;
        const updateConcessionUsecase = new UpdateConcessionUsecase(this.repository);
        const result = await updateConcessionUsecase.execute(id, name, phoneNumber, siret, address);

        if (result instanceof Error) {
            res.status(400).send(result.message);
            return;
        }

        res.status(200).send('Updated successfully');
    }

    public async deleteConcession(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        // const validation = deleteConcessionRequestSchema.safeParse({ id });
        //
        // if (!validation.success) {
        //     res.status(400).send('Invalid ID format');
        //     return;
        // }

        const deleteConcessionUsecase = new DeleteConcessionUsecase(this.repository);
        await deleteConcessionUsecase.execute(id);
        res.status(200).send();
    }
}