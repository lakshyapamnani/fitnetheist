import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { AdminLayout } from './AdminLayout';
import { AdminDashboardView } from './AdminDashboardView';
import { LeadManagementView } from './LeadManagementView';
import { LeadDetailView } from './LeadDetailView';
import { CustomerManagementView } from './CustomerManagementView';
import { ChallengesAdminView } from './ChallengesAdminView';
import { WorkoutsAndExercisesAdminView } from './WorkoutsAndExercisesAdminView';
import { FoodAndDietAdminView } from './FoodAndDietAdminView';
import { TransformationsAndTestimonialsView } from './TransformationsAndTestimonialsView';
import { OrdersAndSubscriptionsView } from './OrdersAndSubscriptionsView';
import { CmsPageBuilderView } from './CmsPageBuilderView';
import { BlogAndFaqCmsView } from './BlogAndFaqCmsView';
import { MediaAndNavigationCmsView } from './MediaAndNavigationCmsView';
import { UsersAndAuditLogsView } from './UsersAndAuditLogsView';
import { AdminSettingsView } from './AdminSettingsView';

export const AdminView: React.FC = () => {
  const { activeSubtab } = useAdmin();

  const renderContent = () => {
    switch (activeSubtab) {
      case 'dashboard':
        return <AdminDashboardView />;
      case 'leads':
        return <LeadManagementView />;
      case 'leads-detail':
        return <LeadDetailView />;
      case 'customers':
        return <CustomerManagementView />;
      case 'challenges':
        return <ChallengesAdminView />;
      case 'workouts':
      case 'exercises':
        return <WorkoutsAndExercisesAdminView />;
      case 'foods':
      case 'diets':
        return <FoodAndDietAdminView />;
      case 'transformations':
      case 'testimonials':
        return <TransformationsAndTestimonialsView />;
      case 'orders':
      case 'subscriptions':
      case 'payments':
        return <OrdersAndSubscriptionsView />;
      case 'cms-pages':
      case 'cms-sections':
        return <CmsPageBuilderView />;
      case 'cms-blog':
      case 'cms-faq':
        return <BlogAndFaqCmsView />;
      case 'cms-media':
      case 'cms-navigation':
      case 'cms-seo':
        return <MediaAndNavigationCmsView />;
      case 'users':
      case 'activity':
        return <UsersAndAuditLogsView />;
      case 'settings':
        return <AdminSettingsView />;
      default:
        return <AdminDashboardView />;
    }
  };

  return (
    <AdminLayout>
      {renderContent()}
    </AdminLayout>
  );
};
