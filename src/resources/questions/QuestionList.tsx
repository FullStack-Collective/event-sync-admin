import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  ReferenceField,
  DeleteButton,
  TextInput,
  TopToolbar,
  ExportButton,
  FilterButton,
} from 'react-admin';

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
  <List
    filters={questionFilters}
    actions={<QuestionListActions />}
    perPage={25}
  >
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
);