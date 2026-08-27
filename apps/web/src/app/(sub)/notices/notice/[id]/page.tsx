import NoticeDetailClient from './NoticeDetailClient';

export async function generateStaticParams() {
  return [{ id: '1' }];
}

export default function NoticeDetailPage() {
  return <NoticeDetailClient />;
}
