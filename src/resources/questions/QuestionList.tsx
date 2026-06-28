import {
  List, Datagrid, TextField, NumberField, DateField, ReferenceField,
  DeleteButton, TextInput,
  FilterButton, TopToolbar, ExportButton,
} from 'react-admin';
import { PageHeader } from '../../components/PageHeader';

const Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const questionFilters = [
  <TextInput key="search" label="Search" source="q" alwaysOn />,
];

const QuestionListActions = () => (
  <TopToolbar>
    <FilterButton />
    <ExportButton />
  </TopToolbar>
);

export const QuestionList = () => (
  <>
    <PageHeader
      icon={<Icon />}
      title="Questions"
      subtitle="Q&A submitted by attendees during sessions"
    />
    <List filters={questionFilters} actions={<QuestionListActions />} perPage={25}>
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <TextField source="id" label="ID" />
        <TextField source="content" label="Question" />
        <TextField source="authorName" label="Author" />
        <NumberField source="upvotes" label="Upvotes" />
        <ReferenceField source="sessionId" reference="sessions" label="Session">
          <TextField source="title" />
        </ReferenceField>
        <DateField source="createdAt" label="Created at" showTime />
        <DeleteButton />
      </Datagrid>
    </List>
  </>
);
