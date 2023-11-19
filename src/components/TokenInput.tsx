import { Box, Link, TextField, Typography } from '@mui/material'

import { ChangeEvent, FormEvent } from 'react'

interface ITokenInput {
  newToken: string
  isValidToken: boolean
  onTokenChange: (e: ChangeEvent<HTMLInputElement>) => void
  onTokenSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const TokenInput = ({
  newToken,
  isValidToken,
  onTokenChange,
  onTokenSubmit,
}: ITokenInput) => (
  <Box sx={{ my: 2 }}>
    <form onSubmit={onTokenSubmit}>
      <TextField
        hiddenLabel
        autoFocus
        fullWidth
        // Note: I was using !!newToken.length, however, newToken.length > 0 should be better for readability.
        error={newToken.length > 0 && !isValidToken}
        helperText={
          newToken.length > 0 && !isValidToken && 'Invalid token format.'
        }
        placeholder="ghp_1234567890abcdefghij1234567890abcdefghij"
        variant="outlined"
        value={newToken}
        onChange={onTokenChange}
        margin="normal"
        FormHelperTextProps={{
          sx: { marginLeft: 0 },
        }}
      />

      <Typography variant="caption" paragraph>
        Need help creating an access token?{' '}
        <Link
          href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn how to create a GitHub Access Token.
        </Link>
      </Typography>
    </form>
  </Box>
)

export default TokenInput
