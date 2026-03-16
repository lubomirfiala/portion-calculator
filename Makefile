dev:
	docker compose up

eslint:
	docker compose exec app npm run eslint

eslint-fix:
	docker compose exec app npm run eslint-fix

build:
	docker compose run --rm app npm run build

cap-sync:
	docker compose run --rm app npm run build && npx cap sync

ios-run:
	docker compose up -d
	docker compose exec app npm run eslint
	docker compose exec app npm run build
	. $$NVM_DIR/nvm.sh && nvm use && ([ -d ios ] || npx cap add ios) && npx cap sync && npx cap run ios
