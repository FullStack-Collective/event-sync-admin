import { Create, SimpleForm, TextInput, NumberInput, required } from 'react-admin';

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Room name" validate={required()} fullWidth />
      <NumberInput source="capacity" label="Capacity" min={1} />
    </SimpleForm>
  </Create>
);