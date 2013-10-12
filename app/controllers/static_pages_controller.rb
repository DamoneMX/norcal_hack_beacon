class StaticPagesController < ApplicationController
  def home
  end

  def beacon
  end
  
  def index
    render layout: false
  end
end
