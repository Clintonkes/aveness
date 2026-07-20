#!/usr/bin/env python3
"""
Set or update the admin login credentials for Afsana Consult.

Usage:
    python backend/set_admin.py <email> <password>

Examples:
    python backend/set_admin.py admin@afsanaconsult.com mypassword123
    python backend/set_admin.py newemail@afsanaconsult.com newpassword
"""

import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.config import settings
from app.database import SessionLocal, Base, engine, with_db_retry
from app.models import AdminUser
from app.security import hash_password


def main():
    if len(sys.argv) != 3:
        print("Usage: python set_admin.py <email> <password>")
        print('Example: python set_admin.py admin@afsanaconsult.com mypassword123')
        sys.exit(1)

    email = sys.argv[1].strip()
    password = sys.argv[2].strip()

    if not email or "@" not in email:
        print(f"Error: '{email}' is not a valid email address.")
        sys.exit(1)

    if len(password) < 6:
        print("Error: Password must be at least 6 characters.")
        sys.exit(1)

    print("Connecting to database (may take a few seconds if it's waking up)...")
    with_db_retry(lambda: Base.metadata.create_all(bind=engine))
    db = SessionLocal()

    try:
        existing = db.query(AdminUser).first()

        if existing:
            existing.email = email
            existing.hashed_password = hash_password(password)
            db.commit()
            print(f"Admin updated successfully.")
            print(f"  Email: {email}")
            print(f"  You can now log in at /admin/login")
        else:
            admin = AdminUser(
                email=email,
                hashed_password=hash_password(password),
            )
            db.add(admin)
            db.commit()
            print(f"Admin created successfully.")
            print(f"  Email: {email}")
            print(f"  You can now log in at /admin/login")
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    main()
