import {
  List, Datagrid, TextField, DateField, ReferenceField,
  EditButton, DeleteButton, TextInput,
  FilterButton, TopToolbar, CreateButton, ExportButton,
} from 'react-admin';
import { PageHeader } from '../../components/PageHeader';

const Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polygon points="23 7 16 12 23 17 23 7"/>
    <rect x="1" y="5" width="15" height="14" rx="2"/>
  </svg>
);

const sessionFilters = [
  <TextInput key="search" label="Search" source="q" alwaysOn />,
];

const SessionListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const SessionList = () => (
  <>
    <PageHeader
      icon={<Icon />}
      title="Sessions"
      subtitle="Manage talks and sessions across all events"
    />
    <List filters={sessionFilters} actions={<SessionListActions />} perPage={10}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="id" label="ID" />
        <TextField source="title" label="Title" />
        <ReferenceField source="eventId" reference="events" label="Event">
          <TextField source="title" />
        </ReferenceField>
        <ReferenceField source="roomId" reference="rooms" label="Room">
          <TextField source="name" />
        </ReferenceField>
        <DateField source="startTime" label="Start" showTime />
        <DateField source="endTime" label="End" showTime />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  </>
);
