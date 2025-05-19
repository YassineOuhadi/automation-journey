FROM node:20-alpine AS deps

WORKDIR /automation-journey

COPY package.json package-lock.json ./
RUN npm install

COPY cypress-e2e ./cypress-e2e

RUN npm install --prefix ./cypress-e2e

FROM cypress/included:14.3.1

WORKDIR /e2e

COPY --from=deps /automation-journey/cypress-e2e .

ENV INTERACTIVE_MODE=false

ENTRYPOINT ["/bin/sh", "-c", "\
  if [ \"$INTERACTIVE_MODE\" = \"true\" ]; then \
    npx cypress open --project .; \
  else \
    npx cypress run --project .; \
  fi \
"]
