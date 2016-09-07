class CampaignsController < ApplicationController
  respond_to :json
  def create
    @campaign = Campaign.new campaign_params
    if @campaign.save
      render :status => 200,
       :json => { :success => true,
                  :info => "created",
                  :campaign => @campaign
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "create fail",
       }
    end
  end

  def update
    @campaign = Campaign.update params[:id], campaign_params
    if @campaign.save
      render :status => 200,
       :json => { :success => true,
                  :info => "updated",
                  :campaign => @campaign
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "update fail",
       }
    end
  end

  def destroy
    @campaign = Campaign.find params[:id]
    if @campaign.destroy
      render :status => 200,
       :json => { :success => true,
                  :info => "deleted",
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "delete fail",
       }
    end
  end

  def index
    @campaigns = Campaign.where(user_id: params[:user_id])
    render json: @campaigns
  end

  def show
    @campaigns = Campaign.find params[:id]
    render json: @campaigns
  end

  private
    def campaign_params
      params.require(:campaign).permit(:name, :user_id)
    end
end
