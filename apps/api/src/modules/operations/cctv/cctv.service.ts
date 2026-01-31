import { PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CctvService {
  constructor(private readonly prisma: PrismaService) {}

  async getCctvDevices(query: { page: number; limit: number; status?: string }) {
    const { page, limit, status } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const [devices, total] = await Promise.all([
      this.prisma.cctvDevice.findMany({
        where,
        skip,
        take: limit,
        orderBy: { deviceNo: 'asc' },
      }),
      this.prisma.cctvDevice.count({ where }),
    ]);

    return {
      data: devices.map(device => ({
        ...device,
        id: device.id.toString(),
        installDate: device.installDate ? device.installDate.toISOString().split('T')[0] : null,
        lastCheckDate: device.lastCheckDate ? device.lastCheckDate.toISOString().split('T')[0] : null,
        createdAt: device.createdAt.toISOString(),
        updatedAt: device.updatedAt.toISOString(),
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getCctvViewLogs(query: { page: number; limit: number; deviceId?: string; startDate?: string }) {
    const { page, limit, deviceId, startDate } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (deviceId) where.deviceId = BigInt(deviceId);
    if (startDate) where.viewStart = { gte: new Date(startDate) };

    const [logs, total] = await Promise.all([
      this.prisma.cctvViewLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { viewStart: 'desc' },
        include: {
          device: true,
          viewer: true,
          approver: true,
        },
      }),
      this.prisma.cctvViewLog.count({ where }),
    ]);

    return {
      data: logs.map(log => ({
        ...log,
        id: log.id.toString(),
        deviceId: log.deviceId.toString(),
        viewerId: log.viewerId.toString(),
        approvedBy: log.approvedBy?.toString() ?? null,
        viewStart: log.viewStart.toISOString(),
        viewEnd: log.viewEnd?.toISOString() ?? null,
        createdAt: log.createdAt.toISOString(),
        device: {
          ...log.device,
          id: log.device.id.toString(),
          installDate: log.device.installDate?.toISOString() ?? null,
          lastCheckDate: log.device.lastCheckDate?.toISOString() ?? null,
          createdAt: log.device.createdAt.toISOString(),
          updatedAt: log.device.updatedAt.toISOString(),
        },
        viewer: {
          name: log.viewer.name,
        },
        approver: log.approver ? { name: log.approver.name } : null,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
