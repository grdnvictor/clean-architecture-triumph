import type { BrandEntity} from "../../domain/entities/BrandEntity";

export interface BrandRepository {
    save(brand: BrandEntity ): Promise<void>;
    all(): Promise<BrandEntity[]>;
   // findByOption(options: { where?: Record<string, any>; select?: string[]; orderBy?: string; limit?: number; offset?: number; }): Promise<BrandEntity[]>;
}