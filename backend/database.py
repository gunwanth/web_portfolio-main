import logging
import os
from typing import Optional, Tuple

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo.errors import ConfigurationError, InvalidURI

logger = logging.getLogger(__name__)

_client: Optional[AsyncIOMotorClient] = None
_db: Optional[AsyncIOMotorDatabase] = None


def init_database() -> Tuple[Optional[AsyncIOMotorClient], Optional[AsyncIOMotorDatabase]]:
    """Create the Mongo client only when the deployment env is valid."""
    global _client, _db

    if _db is not None:
        return _client, _db

    mongo_url = os.environ.get("MONGO_URL", "").strip()
    db_name = os.environ.get("DB_NAME", "").strip()

    if not mongo_url or not db_name:
        logger.warning("MongoDB is not configured; database-backed endpoints are disabled.")
        return None, None

    try:
        _client = AsyncIOMotorClient(mongo_url)
        _db = _client[db_name]
        return _client, _db
    except (ConfigurationError, InvalidURI, ValueError) as exc:
        logger.error("MongoDB configuration is invalid; database-backed endpoints are disabled: %s", exc)
        _client = None
        _db = None
        return None, None


def get_database() -> Optional[AsyncIOMotorDatabase]:
    return init_database()[1]


def close_database() -> None:
    global _client, _db

    if _client is not None:
        _client.close()

    _client = None
    _db = None
