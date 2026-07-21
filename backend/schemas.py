from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class BookingCreate(BaseModel):
    address: str
    frequency: str
    name: str
    email: EmailStr
    phone: str


class BookingResponse(BaseModel):
    id: int
    reference: str
    address: str
    frequency: str
    name: str
    email: str
    phone: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class BookingStatusUpdate(BaseModel):
    status: str


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: Optional[str] = None
    message: str


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    subject: Optional[str]
    message: str
    created_at: datetime

    class Config:
        from_attributes = True


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
