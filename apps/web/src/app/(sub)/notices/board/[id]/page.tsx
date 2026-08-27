import BoardDetailClient from './BoardDetailClient';

export async function generateStaticParams() {
  return [{ id: '1' }];
}

export default function BoardDetailPage() {
  return <BoardDetailClient />;
}
