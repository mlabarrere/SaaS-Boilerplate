import { OrganizationProfile } from '@clerk/nextjs';
import { getTranslations } from 'next-intl/server';

import { TitleBar } from '@/features/dashboard/TitleBar';

const OrganizationProfilePage = async (props: { params: Promise<{ locale: string }> }) => {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'OrganizationProfile',
  });

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <OrganizationProfile
        routing="path"
        path="/organization-profile"
        afterLeaveOrganizationUrl="/onboarding/organization-selection"
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

export default OrganizationProfilePage;
