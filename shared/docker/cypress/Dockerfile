FROM node:22-alpine AS deps

WORKDIR /automation-journey

COPY package.json yarn.lock ./
COPY cypress-e2e/package.json ./cypress-e2e/

RUN yarn install --frozen-lockfile

COPY . .

FROM cypress/included:14.3.1

WORKDIR /e2e

COPY --from=deps /automation-journey/cypress-e2e ./

COPY --from=deps /automation-journey/node_modules ./node_modules
COPY --from=deps /automation-journey/cypress-e2e/node_modules ./node_modules

ENV INTERACTIVE_MODE=false

ENTRYPOINT ["/bin/sh", "-c", "\
  if [ \"$INTERACTIVE_MODE\" = \"true\" ]; then \
    yarn cypress:open; \
  else \
    yarn cypress:run; \
  fi \
"]
