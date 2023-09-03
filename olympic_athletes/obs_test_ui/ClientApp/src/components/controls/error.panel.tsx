import { ApolloError } from '@apollo/client';
import { Alert, AlertTitle, LinearProgress, Paper, Typography } from '@mui/material';
import strings from 'res/string';

export interface IErrorPanelProps {
  error: ApolloError | undefined;
  onClose?: () => void;
}
export function parseGraphQLError(message: string): string {
  const result = message.split('\r\n');
  if (result.length > 2) return result[1].replace('---> System.Exception:', '').trim();
  return message.replace('GraphQL.Server.', '').replace('---> System.Exception:', '').replace('--->', '').replace('GraphQL.Execution.UnhandledError:', '<u>Error</u>: ').trim();
}
export function parseGraphQLErrors(data: ApolloError): string[] {
  if (data.graphQLErrors?.length > 0) return data.graphQLErrors?.map(({ message }) => parseGraphQLError(message));
  if (data.clientErrors?.length > 0) return data.clientErrors?.map(({ message }) => parseGraphQLError(message));
  return [data.message];
}
export const ErrorPanel = (props: IErrorPanelProps): React.ReactElement | null => {
  if (!props.error) return null;
  const parserErros = parseGraphQLErrors(props.error);
  if (parserErros.length == 0) return null;
  return (
    <Paper sx={{ p: 1, my: 1 }}>
      <Alert
        severity="error"
        sx={{ py: 2 }}
        onClose={() => {
          if (props.onClose) props.onClose();
        }}
      >
        <AlertTitle>{strings.main.common.errorTitle}</AlertTitle>
        {props.error && parserErros.map((me: string, i: number) => <Typography key={i} variant="body1" dangerouslySetInnerHTML={{ __html: me }} />)}
      </Alert>
    </Paper>
  );
};

interface LoadingPanelProps {
  loading: boolean;
}
export const GenericLoadingPanel = ({ loading }: LoadingPanelProps) => {
  if (!loading) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        width: '100%',
        p: 1,
        m: 0,
      }}
    >
      <LinearProgress />
    </Paper>
  );
};
