import { matchPath } from 'react-router';
import { has, isUndefined } from 'lodash';
import { entryRoutes } from '../src/views/AppEntry';

const debug = require('debug')('initialFetch resolver');

export default function initialFetch(RootComponent, store, location) {
  return new Promise((resolve, reject) => {
    const promises = [];
    entryRoutes.forEach((routeData) => {
      const match = matchPath(location, routeData);
      if (match !== null && !isUndefined(routeData.component)) {
        let component = routeData.component;
        if (has(component, 'WrappedComponent')) {
          component = component.WrappedComponent;
        }
        if (has(component, 'initialFetch')) {
          debug(`Fetching for ${component.displayName}...`);
          promises.push(component.initialFetch(store, match));
        }
      }
    });
    Promise.all(promises)
      .then(() => {
        resolve({ RootComponent, store });
      })
      .catch((res) => {
        reject(res, { RootComponent, store });
      });
  });
}
