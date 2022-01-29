require('@testing-library/jest-dom')
const fetchMock = require('jest-fetch-mock')
const { TextEncoder, TextDecoder } = require('util')
const dotenv = require('dotenv')

dotenv.config({ path: '.env.local' })
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
fetchMock.enableMocks()
