import { Layout } from 'react-admin';
import type { LayoutProps, SidebarProps } from 'react-admin';
import { CustomMenu } from './CustomMenu';

const NullSidebar = ({ children }: SidebarProps) => (
  <div style={{ width: 0, overflow: 'visible', position: 'relative' }}>
    {children}
  </div>
);

export const CustomLayout = (props: LayoutProps) => (
  <Layout
    {...props}
    appBar={() => null}
    sidebar={NullSidebar}
    menu={CustomMenu}
    sx={{
      '& .RaLayout-appFrame': {
        marginTop: '0 !important',
        paddingTop: '0 !important',
      },
      '& .RaLayout-contentWithSidebar': {
        marginLeft: '0 !important',
        paddingLeft: '0 !important',
      },
      '& .RaLayout-content': {
        marginLeft: '240px',
        marginTop: '0 !important',
        paddingTop: '1rem',
        minHeight: '100vh',
        backgroundColor: '#0d1b1a',
        transition: 'margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        boxSizing: 'border-box',
      },
    }}
  />
);
