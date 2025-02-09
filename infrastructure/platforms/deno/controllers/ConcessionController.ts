import {ConcessionRepository} from "../../../../application/repositories/ConcessionRepository.ts";

import {
  ListConcessionsUsecase,
  CreateConcessionUsecase,
  DeleteConcessionUsecase,
  GetConcessionByIdUsecase,
  UpdateConcessionUsecase
} from "../../../../application/usecases/concession/index.ts";

import {
  createConcessionRequestSchema, deleteConcessionRequestSchema,
  getConcessionByIdRequestSchema,
  updateConcessionRequestSchema
} from "../schemas/concession/index.ts";

export class ConcessionController {
  constructor(private readonly repository: ConcessionRepository) {}

  public async listConcessions(): Promise<Response> {
    const listConcessionsUsecase = new ListConcessionsUsecase(
        this.repository
    );
    const concessions = await listConcessionsUsecase.execute();

    return new Response(JSON.stringify(concessions), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public async createConcession(request: Request): Promise<Response> {
    const body = await request.json();
    const validation = createConcessionRequestSchema.safeParse(body);

    if (!validation.success) {
      return new Response(null, { status: 400 });
    }

    const {
      name,
      phoneNumber,
      siret,
      address
    } = validation.data;
    const createConcessionUsecase = new CreateConcessionUsecase(this.repository);
    const result = await createConcessionUsecase.execute(
        name,
        phoneNumber,
        siret,
        address
    );

    if (result instanceof Error) {
      return new Response(result.message, {
        status: 400
      });
    }

    return new Response(null, {
      status: 201
    });
  }

  public async getConcessionById(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    if (!id) return new Response("Missing ID", { status: 400 });

    const validation = getConcessionByIdRequestSchema.safeParse({ id });
    if (!validation.success) return new Response("Invalid ID format", { status: 400 });

    const getConcessionByIdUsecase = new GetConcessionByIdUsecase(this.repository);
    const concession = await getConcessionByIdUsecase.execute(id);
    if (!concession) return new Response("Concession not found", { status: 404 });

    return new Response(JSON.stringify(concession), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public async updateConcession(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    if (!id) return new Response("Missing ID", { status: 400 });

    const body = await request.json();
    const validation = updateConcessionRequestSchema.safeParse(body);

    if (!validation.success) return new Response("Malformed request", { status: 400 });

    const {
      name,
      phoneNumber,
      siret,
      address
    } = validation.data;
    const updateConcessionUsecase = new UpdateConcessionUsecase(this.repository);
    const result = await updateConcessionUsecase.execute(
        id,
        name,
        phoneNumber,
        siret,
        address
    );

    if (result instanceof Error) {
      return new Response(result.message, { status: 400 });
    }

    return new Response("Updated successfully", { status: 200 });
  }

  public async deleteConcession(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    if (!id) return new Response("Missing ID", { status: 400 });

    const validation = deleteConcessionRequestSchema.safeParse({ id });
    if (!validation.success) {
      return new Response("Invalid ID format", {
        status: 400
      });
    }

    const deleteConcessionUsecase = new DeleteConcessionUsecase(this.repository);
    await deleteConcessionUsecase.execute(id);
    return new Response(null, {
      status: 200
    });
  }
}
