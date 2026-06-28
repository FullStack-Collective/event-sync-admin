import {
  List, Datagrid, TextField, UrlField,
  EditButton, DeleteButton, TextInput,
  FilterButton, TopToolbar, CreateButton, ExportButton,
} from 'react-admin';
import { PageHeader } from '../../components/PageHeader';

const Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const speakerFilters = [
  <TextInput key="search" label="Search" source="q" alwaysOn />,
];

const SpeakerListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const SpeakerList = () => (
  <>
    <PageHeader
      icon={<Icon />}
      title="Speakers"
      subtitle="Manage speaker profiles and social links"
    />
    <List filters={speakerFilters} actions={<SpeakerListActions />} perPage={25}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="id" label="ID" />
        <TextField source="name" label="Name" />
        <TextField source="bio" label="Bio" />
        <UrlField source="twitter" label="Twitter" />
        <UrlField source="linkedin" label="LinkedIn" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  </>
);
