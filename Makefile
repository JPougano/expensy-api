INTERACTIVE=$(shell [ -t 0 ] && echo i || echo d)
APPDIR=/usr/hu
PWD=$(shell pwd)
PORT=8016
PORT_DEBUG=18016
CONTAINER_NAME=expensy-api
DOCKER_CONTEXT=.

define WELCOME_ART                                                                        
   _____  ___ __   ___ _ __  ___ _   _ 
  / _ \ \/ / '_ \ / _ \ '_ \/ __| | | |
 |  __/>  <| |_) |  __/ | | \__ \ |_| |
  \___/_/\_\ .__/ \___|_| |_|___/\__, |
           | |                    __/ |
           |_|                   |___/ 


endef
export WELCOME_ART

COLOR_RESET=\e[0m
WELCOME_ART_COLOR=\e[1;33m

welcome:
	@printf "${WELCOME_ART_COLOR}$$WELCOME_ART${COLOR_RESET}"


setup: welcome docker-build-image
ifeq ($(shell test -f ./env || echo "no"),no)
	@cp .env_default .env
endif
	@echo "Install node dependencies"

start: welcome docker-check-if-image-exists
	@echo "Starting server on port ${PORT}"
	@docker run -t${INTERACTIVE} \
	--name ${CONTAINER_NAME} \
	--rm \
	-p ${PORT}:3000 \
	-p ${PORT_DEBUG}:5858 \
	--env-file .env \
	-e USER_PERM=$(shell id -u):$(shell id -g) \
	-v ${PWD}:${APPDIR} \
	${CONTAINER_NAME}


stop:
	@echo "Stoping ${CONTAINER_NAME}"
	@docker stop ${CONTAINER_NAME}

docker-check-if-image-exists:
ifeq ($(shell $(DOCKER) images -q $(CONTAINER_NAME) 2> /dev/null | wc -l),0)
	@echo "Docker image not found, building Docker image first"; sleep 2;
	@make setup
endif

docker-build-image:
	@echo "Building docker image from Dockerfile"
	@docker build -t ${CONTAINER_NAME} ${DOCKER_CONTEXT}
