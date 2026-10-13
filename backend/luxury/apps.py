from django.apps import AppConfig


class LuxuryConfig(AppConfig):
    name = 'luxury'

    def ready(self):
        from django.db.models.signals import post_migrate
        from django.core.management import call_command

        def seed_after_migrate(sender, **kwargs):
            try:
                call_command("seed_products")
            except Exception:
                pass

        post_migrate.connect(seed_after_migrate, sender=self)

