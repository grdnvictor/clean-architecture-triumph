import type { PartRepository } from "../../../../application/repositories/PartRepository";

import {
    createPartRequestSchema,
    updatePartRequestSchema,
    deletePartRequestSchema,
    getPartByIdRequestSchema
} from "../schemas/part/index";

import {
    CreatePartUsecase,
    ListPartsUsecase,
    GetPartByIdUsecase,
    UpdatePartUsecase,
    DeletePartUsecase
} from "../../../../application/usecases/part/";

export class PartController {
    constructor(private readonly repository: PartRepository) {}

    public async listParts(_: Request): Promise<Response> {
        const listPartsUsecase = new ListPartsUsecase(this.repository);
        const parts = await listPartsUsecase.execute();

        return new Response(JSON.stringify(parts), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    public async createPart(request: Request): Promise<Response> {
        const body = await request.json();
        const validation = createPartRequestSchema.safeParse(body);

        if (!validation.success) {
            return new Response(null, { status: 400 });
        }

        const { name, reference, stock, minimumStock } = validation.data;
        const createPartUsecase = new CreatePartUsecase(this.repository);
        const result = await createPartUsecase.execute(name, reference, stock, minimumStock);

        if (result instanceof Error) {
            return new Response(result.message, { status: 400 });
        }

        return new Response(null, { status: 201 });
    }

    public async getPartById(request: Request): Promise<Response> {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();
        if (!id) return new Response("Missing ID", { status: 400 });

        const validation = getPartByIdRequestSchema.safeParse({ id });
        if (!validation.success) return new Response("Invalid ID format", { status: 400 });

        const getPartByIdUsecase = new GetPartByIdUsecase(this.repository);
        const part = await getPartByIdUsecase.execute(id);
        if (!part) return new Response("Part not found", { status: 404 });

        return new Response(JSON.stringify(part), { headers: { "Content-Type": "application/json" } });
    }

    public async updatePart(request: Request): Promise<Response> {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();
        if (!id) return new Response("Missing ID", { status: 400 });

        const body = await request.json();
        const validation = updatePartRequestSchema.safeParse(body);

        if (!validation.success) return new Response("Malformed request", { status: 400 });

        const { name, reference, stock, minimumStock } = validation.data;
        const updatePartUsecase = new UpdatePartUsecase(this.repository);
        const result = await updatePartUsecase.execute(id, name, reference, stock, minimumStock);

        if (result instanceof Error) {
            return new Response(result.message, { status: 400 });
        }

        return new Response("Updated successfully", { status: 200 });
    }

    public async deletePart(request: Request): Promise<Response> {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();
        if (!id) return new Response("Missing ID", { status: 400 });

        const validation = deletePartRequestSchema.safeParse({ id });
        if (!validation.success) {
            return new Response("Invalid ID format", { status: 400 });
        }

        const deletePartUsecase = new DeletePartUsecase(this.repository);
        await deletePartUsecase.execute(id);
        return new Response(null, { status: 200 });
    }
}
