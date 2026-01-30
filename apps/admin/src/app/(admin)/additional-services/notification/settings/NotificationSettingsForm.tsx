'use client';

import { api } from '@/lib/api';
import { NotificationConfig, NotificationConfigSchema } from '@agape-care/api-contract';
import { Button, Card, CardContent, CardHeader, CardTitle, Checkbox, Input } from '@agape-care/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function NotificationSettingsForm() {
  const { data: settings, isLoading } = api.notification.getNotificationSettings.useQuery();
  const utils = api.useContext();

  const { mutate: updateSettings, isLoading: isUpdating } = api.notification.updateNotificationSettings.useMutation({
    onSuccess: () => {
      toast.success('알림 설정이 저장되었습니다.');
      utils.notification.getNotificationSettings.invalidate();
    },
    onError: error => {
      toast.error(`저장 실패: ${error.message}`);
    },
  });

  const form = useForm<NotificationConfig>({
    resolver: zodResolver(NotificationConfigSchema),
    defaultValues: {
      sms: { enabled: false, senderPhone: '', apiKey: '' },
      email: { enabled: false, senderName: '', senderEmail: '' },
      push: { enabled: false },
      kakao: { enabled: false, senderKey: '' },
      dailyLimit: 0,
    },
  });

  useEffect(() => {
    if (settings?.body) {
      form.reset(settings.body);
    }
  }, [settings, form]);

  const onSubmit = (data: NotificationConfig) => {
    updateSettings({ body: data });
  };

  if (isLoading) {
    return <div className="py-20 text-center text-gray-500">설정 로딩중...</div>;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SMS 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Checkbox id="sms-enabled" label="SMS 발송 사용" {...form.register('sms.enabled')} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="발신번호"
              placeholder="02-1234-5678"
              {...form.register('sms.senderPhone')}
              disabled={!form.watch('sms.enabled')}
            />
            <Input
              label="API Key (선택)"
              type="password"
              placeholder="API Key Override"
              {...form.register('sms.apiKey')}
              disabled={!form.watch('sms.enabled')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>이메일 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Checkbox id="email-enabled" label="이메일 발송 사용" {...form.register('email.enabled')} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="발신자명"
              placeholder="아가페 케어"
              {...form.register('email.senderName')}
              disabled={!form.watch('email.enabled')}
            />
            <Input
              label="발신 메일주소"
              placeholder="admin@agape-care.com"
              disabled={!form.watch('email.enabled')}
              {...form.register('email.senderEmail')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>푸시/인앱 알림 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Checkbox
            id="push-enabled"
            label="푸시 알림 사용"
            description="푸시 알림은 모바일 앱이 설치된 사용자에게 전송됩니다."
            {...form.register('push.enabled')}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isUpdating}>
          설정 저장
        </Button>
      </div>
    </form>
  );
}
