from alembic import context
from sqlalchemy import engine_from_config, pool
from logging.config import fileConfig

# Import your Base and models
from app.database.database import Base  # Adjust the import according to your directory structure
from app.models.childHealthPrediction import ChildHealthRecord, ChildHealthPrediction  # Adjust the import as needed

# This sets target_metadata to the metadata of your models
target_metadata = Base.metadata

# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(context.config.config_file_name)

# Add your database URL here
config = context.config

def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix='sqlalchemy.',
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            include_schemas=True,
        )

        with context.begin_transaction():
            context.run_migrations()

# Check if running in offline or online mode
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()