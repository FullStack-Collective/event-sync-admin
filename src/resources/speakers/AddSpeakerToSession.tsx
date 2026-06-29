import { 
  Button, 
  useNotify, 
  useRefresh,
  useGetList,
  useRecordContext
} from 'react-admin';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button as MuiButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useState, MouseEvent } from 'react';

export const AddSpeakerToSession = () => {
  const [open, setOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState('');
  const [loading, setLoading] = useState(false);
  const notify = useNotify();
  const refresh = useRefresh();
  const record = useRecordContext();

  const { data: sessions } = useGetList('sessions', {
    pagination: { page: 1, perPage: 100 },
  });

  const handleOpen = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(true);
  };
  
  const handleClose = (e?: MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setOpen(false);
    setSelectedSession('');
    setLoading(false);
  };

  const handleAdd = async (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!selectedSession) {
      notify('Please select a session', { type: 'warning' });
      return;
    }

    if (!record) {
      notify('No speaker selected', { type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const API_BASE = (import.meta.env.VITE_API_URL as string)?.replace(/\/$/, '') ?? 'http://localhost:5000';
      const url = `${API_BASE}/api/speakers/${record.id}/sessions/${selectedSession}`;

const token = localStorage.getItem('admin_token');

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error((errorData as any).error || `HTTP error ${response.status}`);
      }

      notify(`Session added to "${record.name}" successfully!`, { type: 'success' });
      handleClose();
      refresh();
    } catch (error: any) {
      notify(`Error: ${error.message || 'Failed to add session'}`, { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        label="Add Session" 
        onClick={handleOpen}
        sx={{ 
          fontSize: '0.75rem', 
          minWidth: '100px'
        }}
      />
      
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle>Add Speaker to Session</DialogTitle>
        <DialogContent>
          {record && (
            <div style={{ marginBottom: '16px', marginTop: '8px' }}>
              <strong>Speaker:</strong> {record.name}
            </div>
          )}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Session</InputLabel>
            <Select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              label="Select Session"
              disabled={loading}
            >
              {sessions?.map((session: any) => (
                <MenuItem key={session.id} value={session.id}>
                  {session.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleClose} disabled={loading}>Cancel</MuiButton>
          <MuiButton 
            onClick={handleAdd} 
            variant="contained" 
            color="primary"
            disabled={loading || !selectedSession}
          >
            {loading ? 'Adding...' : 'Add'}
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
};