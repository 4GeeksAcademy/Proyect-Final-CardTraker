"""empty message

Revision ID: 3a1c9f1ca9f8
Revises: 3492c69fcdc8
Create Date: 2023-07-09 00:53:58.146245

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3a1c9f1ca9f8'
down_revision = '3492c69fcdc8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('new', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tittle', sa.String(length=120), nullable=False))
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=500),
               type_=sa.String(length=120),
               existing_nullable=False)
        batch_op.create_unique_constraint(None, ['tittle'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('new', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.alter_column('name',
               existing_type=sa.String(length=120),
               type_=sa.VARCHAR(length=500),
               existing_nullable=False)
        batch_op.drop_column('tittle')

    # ### end Alembic commands ###
