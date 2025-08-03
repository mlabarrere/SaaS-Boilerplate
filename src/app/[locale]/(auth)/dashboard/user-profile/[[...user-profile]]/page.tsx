import { UserProfile } from '@clerk/nextjs';
import { getTranslations } from 'next-intl/server';

import { TitleBar } from '@/features/dashboard/TitleBar';

const UserProfilePage = async (props: { params: Promise<{ locale: string }> }) => {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'UserProfile',
  });

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <UserProfile
        routing="path"
        path="/user-profile"
        appearance={{
          elements: {
            rootBox: 'w-full',
            cardBox: 'w-full flex',
          },
        }}
      />
    </>
  );
};

export default UserProfilePage;
