#!/bin/bash

echo Please enter the version you want to publish:
read VERSION

echo Triggering agent-sample build...
AGENT_SAMPLE_TOKEN=$(keybase fs read /keybase/team/stratumn_eng/docker_agent_sample_token.dat)
curl -H "Content-Type: application/json" --data '{"source_type": "Tag", "source_name": "@indigocore/agent-sample@'"$VERSION"'"}' -X POST https://registry.hub.docker.com/u/indigocore/agent-sample/trigger/"$AGENT_SAMPLE_TOKEN"/
printf "\n"

echo Triggering agent-ui build...
AGENT_UI_TOKEN=$(keybase fs read /keybase/team/stratumn_eng/docker_agent_ui_token.dat)
curl -H "Content-Type: application/json" --data '{"source_type": "Tag", "source_name": "@indigocore/agent-ui@'"$VERSION"'"}' -X POST https://registry.hub.docker.com/u/indigocore/agent-ui/trigger/"$AGENT_UI_TOKEN"/
printf "\n"

echo Triggering agent-js build...
AGENT_JS_TOKEN=$(keybase fs read /keybase/team/stratumn_eng/docker_agent_js_token.dat)
curl -H "Content-Type: application/json" --data '{"source_type": "Tag", "source_name": "@indigocore/agent@'"$VERSION"'"}' -X POST https://registry.hub.docker.com/u/indigocore/agent-js/trigger/"$AGENT_JS_TOKEN"/
printf "\n"

echo Triggering tmpop-explorer build...
TMPOP_EXPLORER_TOKEN=$(keybase fs read /keybase/team/stratumn_eng/docker_tmpop_explorer_token.dat)
curl -H "Content-Type: application/json" --data '{"source_type": "Tag", "source_name": "@indigocore/tmpop-explorer@'"$VERSION"'"}' -X POST https://registry.hub.docker.com/u/indigocore/tmpop-explorer/trigger/"$TMPOP_EXPLORER_TOKEN"/
printf "\n"

echo Docker builds successfully triggered