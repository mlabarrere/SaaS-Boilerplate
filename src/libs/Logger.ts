import type {DestinationStream} from 'pino';
import logtail from '@logtail/pino';
import pino from 'pino';
import pretty from 'pino-pretty';

import { Env } from './Env';

let stream: DestinationStream | undefined;

async function initializeLogger() {
  if (Env.LOGTAIL_SOURCE_TOKEN) {
    stream = pino.multistream([
      await logtail({
        sourceToken: Env.LOGTAIL_SOURCE_TOKEN,
        options: {
          sendLogsToBetterStack: true,
        },
      }),
      {
        stream: pretty(), // Prints logs to the console
      },
    ]);
  } else {
    stream = pretty({
      colorize: true,
    });
  }
}

// Initialize the logger
initializeLogger().catch(console.error);

export const logger = pino({ base: undefined }, stream as DestinationStream);
