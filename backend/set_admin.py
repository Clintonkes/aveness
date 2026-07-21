#!/usr/bin/env python3
"""
Set or update the admin login credentials for Aveness LLC.

Usage:
    python backend/set_admin.py <email> <password>

Examples:
    python backend/set_admin.py admin@avenessllc.com mypassword123
    python backend/set_admin.py newemail@avenessllc.com newpassword
"""

import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, Base, engine, Admin
from auth import get_password_hash


def main():
    if len(sys.argv) != 3:
        print("Usage: python set_admin.py <email> <password>")
        print("Example: python set_admin.py admin@avenessllc.com mypassword123")
        sys.exit(1)

    email = sys.argv[1].strip()
    password = sys.argv[2].strip()

    if not email or "@" not in email:
        print(f"Error: '{email}' is not a valid email address.")
        sys.exit(1)

    if len(password) < 6:
        print("Error: Password must be at least 6 characters.")
        sys.exit(1)

    print("Connecting to database...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        existing = db.query(Admin).first()

        if existing:
            existing.email = email
            existing.hashed_password = get_password_hash(password)
            db.commit()
            print("Admin updated successfully.")
            print(f"  Email: {email}")
            print("  You can now log in at /admin")
        else:
            admin = Admin(
                email=email,
                hashed_password=get_password_hash(password),
            )
            db.add(admin)
            db.commit()
            print("Admin created successfully.")
            print(f"  Email: {email}")
            print("  You can now log in at /admin")
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    main()
