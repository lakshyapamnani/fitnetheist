import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { AdminLayout } from './AdminLayout';
import { FullCmsManagerView } from './FullCmsManagerView';
import { LeadManagementView } from './LeadManagementView';
import { LeadDetailView } from './LeadDetailView';
import { WorkoutsAndExercisesAdminView } from './WorkoutsAndExercisesAdminView';
import { InvoiceReceiptGeneratorView } from './InvoiceReceiptGeneratorView';
import { ClientManagementView } from './ClientManagementView';
import { AdminDashboardView } from './AdminDashboardView';
import { CustomerManagementView } from './CustomerManagementView';
import { ChallengesAdminView } from './ChallengesAdminView';
import { FoodAndDietAdminView } from './FoodAndDietAdminView';
import { TransformationsAndTestimonialsView } from './TransformationsAndTestimonialsView';
import { UsersAndAuditLogsView } from './UsersAndAuditLogsView';
import { AdminSettingsView } from './AdminSettingsView';

export const AdminView: React.FC = () => {
  const { activeSubtab } = useAdmin();

  const renderContent = () => {
    switch (activeSubtab) {
      case 'cms':
      case 'cms-pages':
      case 'cms-sections':
      case 'cms-blog':
      case 'cms-faq':
      case 'cms-media':
      case 'cms-navigation':
      case 'cms-seo':
        return <FullCmsManagerView />;
      
      case 'leads':
        return <LeadManagementView />;
      case 'leads-detail':
        return <LeadDetailView />;

      case 'clients':
      case 'clients-detail':
      case 'customers':
        return <ClientManagementView />;

      case 'workouts':
      case 'exercises':
        return <WorkoutsAndExercisesAdminView />;

      case 'invoices':
      case 'orders':
      case 'subscriptions':
      case 'payments':
        return <InvoiceReceiptGeneratorView />;

      case 'customers':
        return <CustomerManagementView />;
      case 'challenges':
        return <ChallengesAdminView />;
      case 'foods':
      case 'diets':
        return <FoodAndDietAdminView />;
      case 'transformations':
      case 'testimonials':
        return <TransformationsAndTestimonialsView />;
      case 'users':
      case 'activity':
        return <UsersAndAuditLogsView />;
      case 'settings':
        return <AdminSettingsView />;
      case 'dashboard':
      default:
        return <FullCmsManagerView />;
    }
  };

  return (
    <AdminLayout>
      {renderContent()}
    </AdminLayout>
  );
};

