dev:
	docker compose up

build:
	docker compose run --rm app npm run build

cap-sync:
	docker compose run --rm app npm run build && npx cap sync
