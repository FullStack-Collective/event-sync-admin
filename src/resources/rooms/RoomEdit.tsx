import { Edit, SimpleForm, TextInput, NumberInput, required } from 'react-admin';

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Room name" validate={required()} fullWidth />
      <NumberInput source="capacity" label="Capacity" min={1} />
    </SimpleForm>
  </Edit>
);