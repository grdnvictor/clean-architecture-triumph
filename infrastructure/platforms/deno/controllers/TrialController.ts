import type { TrialRepository } from "../../../../application/repositories/TrialRepository.ts";
import type { ClientRepository } from "../../../../application/repositories/ClientRepository.ts";
import type {MotorcycleRepository} from "../../../../application/repositories/MotorcycleRepository.ts";
import type { ConcessionRepository } from "../../../../application/repositories/ConcessionRepository.ts";

import {
  CompleteTrialUsecase,
  CreateTrialUsecase,
  DeleteTrialUsecase,
  GetTrialByIdUsecase,
  UpdateTrialUsecase,
  ListTrialsUsecase
} from "../../../../application/usecases/trial/index.ts";
import {
  createTrialRequestSchema,
  updateTrialRequestSchema,
  completeTrialRequestSchema,
  deleteTrialRequestSchema
} from "../schemas/trial/index.ts";

export class TrialController {
  constructor(
      private readonly trialRepository: TrialRepository,
      private readonly clientRepository: ClientRepository,
      private readonly concessionRepository: ConcessionRepository,
      private readonly motorcycleRepository: MotorcycleRepository
  ) {}

  public async getTrialById(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const concessionId = pathParts[pathParts.length - 2];
    const trialId = pathParts[pathParts.length - 1];

    if (!concessionId || !trialId) return new Response("Missing concession ID or trial ID", { status: 400 });

    const getTrialByIdUsecase = new GetTrialByIdUsecase(this.trialRepository);
    const trial = await getTrialByIdUsecase.execute(trialId);
    if (trial instanceof Error) return new Response(null, { status: 404 });

    return new Response(JSON.stringify(trial), { headers: { "Content-Type": "application/json" } });
  }

  public async listTrials(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const concessionId = url.pathname.split("/").pop();
    if (!concessionId) return new Response("Missing concessionId", { status: 400 });

    const listTrialsUsecase = new ListTrialsUsecase(this.trialRepository);
    const trials = await listTrialsUsecase.execute(concessionId);

    return new Response(JSON.stringify(trials), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public async createTrial(request: Request): Promise<Response> {
    const body = await request.json();
    const validation = createTrialRequestSchema.safeParse(body);

    if (!validation.success) {
      return new Response("Malformed request", { status: 400 });
    }

    const {
      clientId,
      motorcycleId,
      concessionId,
      startDate,
      endDate,
      mileageStart
    } = validation.data;

    const createTrialUsecase = new CreateTrialUsecase(this.trialRepository, this.clientRepository);
    const result = await createTrialUsecase.execute(
        clientId,
        motorcycleId,
        concessionId,
        new Date(startDate),
        new Date(endDate),
        mileageStart
    );

    if (result instanceof Error) {
      return new Response(result.name, {
        status: 400
      });
    }

    return new Response(null, {
      status: 201
    });
  }

  public async updateTrial(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const concessionId = pathParts[pathParts.length - 2];
    const trialId = pathParts[pathParts.length - 1];

    if (!concessionId || !trialId) return new Response("Missing concession ID or trial ID", { status: 400 });

    const body = await request.json();
    const validation = updateTrialRequestSchema.safeParse(body);

    if (!validation.success) {
      return new Response("Malformed request", { status: 400 });
    }

    const {
      clientId,
      motorcycleId,
      startDate,
      endDate,
      mileageStart,
      mileageEnd,
      feedback
    } = validation.data;

    const updateTrialUsecase = new UpdateTrialUsecase(
        this.trialRepository,
        this.clientRepository,
        this.concessionRepository,
        this.motorcycleRepository
    );
    const result = await updateTrialUsecase.execute(
        trialId,
        clientId,
        motorcycleId,
        concessionId,
        startDate ? new Date(startDate) : undefined,
        endDate ? new Date(endDate) : undefined,
        mileageStart,
        mileageEnd,
        feedback
    );

    if (result instanceof Error) {
      return new Response(result.message, { status: 400 });
    }

    return new Response(null, { status: 200 });
  }

  public async deleteTrial(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const concessionId = pathParts[pathParts.length - 2];
    const trialId = pathParts[pathParts.length - 1];

    if (!concessionId || !trialId) return new Response("Missing concession ID or trial ID", { status: 400 });

    const validation = deleteTrialRequestSchema.safeParse({ id: trialId });

    if (!validation.success) {
      return new Response("Invalid ID format", { status: 400 });
    }

    const deleteTrialUsecase = new DeleteTrialUsecase(this.trialRepository);
    await deleteTrialUsecase.execute(trialId);
    return new Response(null, {
      status: 200
    });
  }

  public async completeTrial(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const concessionId = pathParts[pathParts.length - 2];
    const trialId = pathParts[pathParts.length - 1];

    if (!concessionId || !trialId) return new Response("Missing concession ID or trial ID", { status: 400 });

    const body = await request.json();
    const validation = completeTrialRequestSchema.safeParse(body);

    if (!validation.success) {
      return new Response("Malformed request", { status: 400 });
    }

    const { mileageEnd, feedback } = validation.data;

    const completeTrialUsecase = new CompleteTrialUsecase(this.trialRepository);
    await completeTrialUsecase.execute(trialId, mileageEnd, feedback);

    return new Response(null, { status: 200 });
  }
}