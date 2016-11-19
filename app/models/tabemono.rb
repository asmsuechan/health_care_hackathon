class Tabemono < ApplicationRecord
  scope :good, -> { where(genki: 2) }
  scope :normal, -> { where(genki: 1) }
  scope :bad, -> { where(genki: 0) }
end
