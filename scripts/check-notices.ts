import { PrismaClient } from '@agape-care/database';

const prisma = new PrismaClient();

async function main() {
  try {
    const notices = await prisma.notice.findMany({
      take: 5,
    });
    console.log(
      'Notices found:',
      JSON.stringify(notices, (key, value) => (typeof value === 'bigint' ? value.toString() : value), 2),
    );

    if (notices.length === 0) {
      console.log('No notices found. Creating a sample notice...');
      const newNotice = await prisma.notice.create({
        data: {
          title: 'Agape-Care 센터 공지사항입니다.',
          content: '<p>안녕하세요. Agape-Care 센터입니다. 새로운 공지사항 기능이 추가되었습니다.</p>',
          category: 'GENERAL',
          isActive: true,
          isPinned: true,
        },
      });
      console.log(
        'Sample notice created:',
        JSON.stringify(newNotice, (key, value) => (typeof value === 'bigint' ? value.toString() : value), 2),
      );
    }
  } catch (error) {
    console.error('Error checking notices:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
