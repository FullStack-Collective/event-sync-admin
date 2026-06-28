import {
  List, Datagrid, TextField, DateField,
  EditButton, DeleteButton, TextInput, SelectInput,
  FilterButton, TopToolbar, CreateButton, ExportButton,
} from 'react-admin';
import { PageHeader } from '../../components/PageHeader';

const Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const eventFilters = [
  <TextInput key="search" label="Search" source="q" alwaysOn />,
  <SelectInput key="status" label="Status" source="status" choices={[
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'past', name: 'Past' },
  ]} />,
];

const EventListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const EventList = () => (
  <>
    <PageHeader
      icon={<Icon />}
      title="Events"
      subtitle="Create and manage all your events"
    />
    <List filters={eventFilters} actions={<EventListActions />} perPage={10}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="id" label="ID" />
        <TextField source="title" label="Title" />
        <TextField source="location" label="Location" />
        <DateField source="startDate" label="Start date" showTime />
        <DateField source="endDate" label="End date" showTime />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  </>
);
