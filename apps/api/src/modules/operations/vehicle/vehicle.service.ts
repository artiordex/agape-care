import { PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async getVehicles(query: { page: number; limit: number; status?: string }) {
    const { page, limit, status } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        skip,
        take: limit,
        orderBy: { vehicleNo: 'asc' },
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    return {
      data: vehicles.map(vehicle => ({
        ...vehicle,
        id: vehicle.id.toString(),
        purchaseDate: vehicle.purchaseDate ? vehicle.purchaseDate.toISOString().split('T')[0] : null,
        lastInspection: vehicle.lastInspection ? vehicle.lastInspection.toISOString().split('T')[0] : null,
        insuranceExpires: vehicle.insuranceExpires ? vehicle.insuranceExpires.toISOString().split('T')[0] : null,
        createdAt: vehicle.createdAt.toISOString(),
        updatedAt: vehicle.updatedAt.toISOString(),
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
