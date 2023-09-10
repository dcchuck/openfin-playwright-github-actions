// we need to start the runtime and know the devtools port
import { test as setup } from '@playwright/test'
import { launch } from 'openfin-adapter'

setup('Launching application...', async () => {
  await launch({ manifestUrl: 'http://localhost:5173/app.json'})
})
