"""empty message

Revision ID: a57f596d592b
Revises: 108e586d42c8
Create Date: 2023-06-29 01:36:50.559177

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a57f596d592b'
down_revision = '108e586d42c8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('card_provider', sa.String(length=120), nullable=False),
    sa.Column('last_four', sa.Integer(), nullable=False),
    sa.Column('bank_name', sa.String(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('bank_name'),
    sa.UniqueConstraint('card_provider'),
    sa.UniqueConstraint('last_four'),
    sa.UniqueConstraint('user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cards')
    # ### end Alembic commands ###
