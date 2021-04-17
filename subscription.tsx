import React from 'react';
import CoordPanelComponent from '../components/CoordinatorPanel';
import { IEvent } from '../InterfacesFromDB';
import { ICoordinatorEventData, TEventRefetch } from '../InterfacesApollo';
import { useSubscription } from '@apollo/client';
import { UPDATE_RATES } from '../operations/subscriptions/updateRates';
import { GET_COORDINATOR_EVENT } from '../operations/queries/getCoordinatorEvent';
import { getEventUrlCode } from '../utils/util';
import { UPDATE_EVENT_START_DATETIME } from '../operations/subscriptions/updateEventStartDatetime';

interface ICoordinatorPanel {
  gameState: string
  event: IEvent
  eventRefetch: TEventRefetch
}

const CoordinatorPanel: React.FC<ICoordinatorPanel> = ({ gameState, event, eventRefetch }) => {
  useSubscription(
    UPDATE_RATES,
    {
      variables: {
        eventId: event.id,
      },
      onSubscriptionData: ({ client, subscriptionData }) => {
        const cachedQuery: ICoordinatorEventData|null = client.cache.readQuery({
          query: GET_COORDINATOR_EVENT,
          variables: {
            eventId: event.id,
          },
        });
        client.writeQuery({
          query: GET_COORDINATOR_EVENT,
          variables: {
            url: getEventUrlCode(),
          },
          data: {
            coordinatorEvent: {
              ...cachedQuery?.coordinatorEvent,
              ...subscriptionData.data.updateRates
            },
          },
        });
      },
    },
  );

  useSubscription(
    UPDATE_EVENT_START_DATETIME,
    {
      variables: {
        eventId: event.id,
      },
      onSubscriptionData: ({ client, subscriptionData }) => {
        const cachedQuery: ICoordinatorEventData|null = client.cache.readQuery({
          query: GET_COORDINATOR_EVENT,
          variables: {
            eventId: event.id,
          },
        });
        client.writeQuery({
          query: GET_COORDINATOR_EVENT,
          variables: {
            url: getEventUrlCode(),
          },
          data: {
            coordinatorEvent: {
              ...cachedQuery?.coordinatorEvent,
              startDatetime: Date.parse(subscriptionData.data.updateEventStartDatetime),
            },
          },
        });
      },
    },
  );
  return (
    <CoordPanelComponent
      event={event}
      gameState={gameState}
      eventRefetch={eventRefetch}
    />
  )

};


export default CoordinatorPanel;
