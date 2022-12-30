import { ApiPromise, WsProvider } from '@polkadot/api';
import type { EventRecord } from '@polkadot/types/interfaces';

async function main () {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });

    // Subscribe to system events via storage
     api.query.system.events((events: any[]) => {
        console.log(`\nReceived ${events.length} events`);

        // Loop through the Vec<EventRecord>
        events.forEach((record: EventRecord) => {
            // Extract the phase, event and the event types
            const {event} = record;

            if(api.events.balances.Transfer.is(event)) {
                console.log(event.toHuman());
            }
            
        });
    });

}


main().catch((error) => {
    console.error(error);
    process.exit(-1);
  });